# JavaScript から wasm に文字列を渡す / wasm から JavaScript に文字列を受け取る

下記の記事のデモコードです。

- [JavaScript から wasm に文字列を渡す with TinyGo - 無駄と文化](https://blog.mudatobunka.org/entry/2025/01/14/120000_1)
- [wasm から JavaScript に文字列を受け取る with TinyGo - 無駄と文化](https://blog.mudatobunka.org/entry/2025/01/14/120000)

## 実行方法

wasm コンパイル

```sh
$ make main.wasm
```

TypeScript を実行

```sh
$ deno run --allow-read passStringToWasm.ts     
Hello, 世界🌍

$ deno run --allow-read receiveStringFromWasm.ts
やっほー From WebAssembly!🤟
```

## バージョン

下記のバージョンで動作確認しています。

- TinyGo: version 0.35.0 darwin/arm64 (using go version go1.23.2 and LLVM version 18.1.2)
- deno: 2.1.5 (stable, release, aarch64-apple-darwin)
  - v8 13.0.245.12-rusty
  - typescript 5.6.2
