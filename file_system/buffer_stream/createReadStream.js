const fs = require('fs');

// 읽기 스트림 생성: .createReadStream(읽을 파일 경로, 옵션객체);
// highWaterMark: 버퍼의 크기를 정할 수 있는 옵션 (default: 64KB) > 예제는 16B
const readStream = fs.createReadStream('./readme3.txt', { highWaterMark: 16 });
const data = [];

// 파일 크기가 버퍼 크기보다 크다면 여러번 발생
readStream.on('data', (chunk) => {
    data.push(chunk);
    console.log('data: ', chunk, chunk.length);
});

// 파일을 다 읽으면 on('end') 실행
readStream.on('end', () => {
    console.log('end: ', Buffer.concat(data).toString());
});

readStream.on('error', (err) => {
    console.error(err);
});

/*
    data:  <Buffer ec a0 80 eb 8a 94 20 ec a1 b0 ea b8 88 ec 94 a9> 16
    data:  <Buffer 20 ec a1 b0 ea b8 88 ec 94 a9 20 eb 82 98 eb 88> 16
    data:  <Buffer a0 ec 84 9c 20 ec a0 84 eb 8b ac eb 90 a9 eb 8b> 16
    data:  <Buffer 88 eb 8b a4 2e 20 eb 82 98 eb 88 a0 ec a7 84 20> 16
    data:  <Buffer ec a1 b0 ea b0 81 ec 9d 84 20 63 68 75 6e 6b 20> 16
    data:  <Buffer eb 9d bc ea b3 a0 20 eb b6 80 eb a6 85 eb 8b 88> 16
    data:  <Buffer eb 8b a4 2e> 4
    end:  저는 조금씩 조금씩 나눠서 전달됩니다. 나눠진 조각을 chunk 라고 부릅니다.
*/