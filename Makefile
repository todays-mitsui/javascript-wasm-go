all: main.wasm main.wat

main.wasm:
	GOOS=js GOARCH=wasm tinygo build -o main.wasm ./main.go

main.wat: main.wasm
	wasm2wat main.wasm -o main.wat

clean:
	rm -f main.wasm main.wat
