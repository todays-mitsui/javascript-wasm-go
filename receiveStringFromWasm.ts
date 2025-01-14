import './wasm_exec.js';

// wasm モジュールを読み込み、インスタンスを返す
async function loadModule(): Promise<WebAssembly.Instance> {
  const go = new Go();
  const result = await WebAssembly.instantiateStreaming(
    fetch(new URL('./main.wasm', import.meta.url)),
    go.importObject
  );
  const wasm = result.instance;
  go.run(wasm);
  return wasm;
}

function readStringFromMemory(
  wasm: WebAssembly.Instance,
  ptr: number,
  len: number,
): string {
  // wasm モジュールは線形メモリを exports.memory として露出している
  // このメモリをやりとりに使う
  const memory = new Uint8Array(wasm.exports.memory.buffer);

  // ptr, len で指定された範囲のバイト列を読み取る
  const utf8str: Uint8Array = memory.slice(ptr, ptr + len);

  // メモリには UTF-8 形式で書き込まれているので
  // デコードして JavaScript の文字列 (UTF-16 形式) に変換する
  return new TextDecoder().decode(utf8str);
}

async function main() {
  const wasm = await loadModule();

  // wasm から文字列をメモリに書き込み、その開始位置のポインタを受け取る
  const ptr: number = wasm.exports.returnString();

  // wasm から文字列の長さを受け取る
  const len: number = wasm.exports.getBufSize();

  // ポインタと長さから文字列を読み取る
  const str = readStringFromMemory(wasm, ptr, len);

  console.log(str); // => やっほー From WebAssembly!🤟
}

main();
