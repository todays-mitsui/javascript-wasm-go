package main

import (
	"fmt"
	"unsafe"
)

func main() {
	c := make(chan struct{})
	<-c
}

//go:wasmexport printString
func printString(str string) {
	fmt.Println(str)
}

// 複数の関数 `returnString()`, `getBufSize()` で状態を共有するためのグローバル変数
var bufSize uint32

// 文字列を返す関数
//
// この関数はメモリの解放を厳密に扱えない
// ランタイムの GC によって返したポインタが無効になる恐れがあるので
// 実際の業務に関わるコードには使わないでください
//
//go:wasmexport returnString
func returnString() uint32 {
	str := "やっほー From WebAssembly!🤟"

	// 文字列をバイト列に変換
	buf := []byte(str)

	// バイト列の先頭のポインタを取得
	ptr := uintptr(unsafe.Pointer(&buf[0]))

	// バイト列のサイズを取得
	// getBufSize() から参照できるようにグローバル変数に保存
	bufSize = uint32(len(buf))

	// ポインタを uint32 に変換して返す
	// 本当は多値 `uint32(ptr), bufSize` を返したいが
	// 2025年1月現在 TinyGo は単一の uint32 しか返せない
	return uint32(ptr)
}

//go:wasmexport getBufSize
func getBufSize() uint32 {
	return bufSize
}
