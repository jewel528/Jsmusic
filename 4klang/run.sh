echo "If gcc is not able to compile on OSX, try installing headers from /Library/Developer/CommandLineTools/Packages/macOS_SDK_headers_for_macOS_10.14.pkg"
node 4klang.inc.js
yasm -f macho 4klang.asm
gcc -Wl,-no_pie -m32 4klang.o 4klangrender.c -o 4klangrender
node livereload.js | sox -S -t raw -b 32 -e float -r 44100 -c 2 - -d
#./4klangrender | sox -S -t raw -b 32 -e float -r 44100 -c 2 - out.wav
