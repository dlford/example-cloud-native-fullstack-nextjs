package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	response, err := http.Get(fmt.Sprintf("http://127.0.0.1:%s", os.Getenv("HEALTHCHECK_PORT")))
	if err != nil {
		os.Exit(1)
	}
	if response.StatusCode != 200 {
		os.Exit(1)
	}
	os.Exit(0)
}
