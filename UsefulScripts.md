- 쓰지 않는 컨테이너 및 네트워크 삭제
```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
docker system prune -a --volumes
```


- 특정 포트로 컨테이너 실행

```bash
docker run -d -p {port}:80 --name {container_name} --rm {image_name}
```

- <span class='hl'>모든 컨테이너 삭제</span>

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```

- 쓰지 않는 <span class='hl'>볼륨 삭제</span> 

```bash
docker volume prune
```

- 쓰지 않는 이미지, 컨테이너, 네트워크, 볼륨 삭제

```bash
docker system prune -a --volumes
```

- 도커 컴포트 종료
    - 도커 컴포즈로 실행한 <span class='hl'>모든 컨테이너, 이미지, 볼륨, 오리팬 삭제</span>

```bash
docker-compose down --rmi all --volumes --remove-orphans
```

- <span class='hl'>도커 컴포즈로 백그라운드 실행</span>

```bash
docker-compose up -d 
```

- 주피터 노트북 실행 
```bash
docker run -p 8888:8888 -v {host_directory}:{container_directory} jupyter/datascience-notebook
docker run --rm -d -p 8888:8888 -v /home/ubuntu/2025_LEARN:/home/jovyan/work jupyter/datascience-notebook
```






<style>
    .hl { background-color: #eff5faff; padding: 1px 6px; border-radius: 3px; color: #000000; }
    .hl-title { background-color: #acd3f0ff; padding: 3px 6px; border-radius: 10px; color: #000000; }
    .hl-yellow { background-color: #FFF2CC; padding: 1px 6px; border-radius: 3px; }
    .hl-blue { background-color: #CCE5FF; padding: 1px 6px; border-radius: 3px; }
    .hl-green { background-color: #D5E8D4; padding: 1px 6px; border-radius: 3px; }
    .hl-pink { background-color: #FFE6E6; padding: 1px 6px; border-radius: 3px; }
    code { background-color: #f5f5f5; padding: 2px 4px; border-radius: 3px; }
    
    /* 헤더 넘버링 */
    body { counter-reset: h2; }
    h2 { counter-reset: h3; counter-increment: h2; }
    h3 { counter-reset: h4; counter-increment: h3; }
    h4 { counter-reset: h5; counter-increment: h4; }
    h5 { counter-reset: h6; counter-increment: h5; }
    h6 { counter-increment: h6; }
    
    h2:before { content: counter(h2) ". "; }
    h3:before { content: counter(h2) "." counter(h3) ". "; }
    h4:before { content: counter(h2) "." counter(h3) "." counter(h4) ". "; }
    h5:before { content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) ". "; }
    h6:before { content: counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) ". "; }
    
    /* Table of Contents에는 넘버링 제외 */
    h2:first-of-type:before { content: ""; }
    h2:first-of-type { counter-increment: none; }
    
    /* Table of Contents 하위 항목들도 넘버링 제외 */
    h2:first-of-type ~ ul h3:before,
    h2:first-of-type ~ ul h4:before,
    h2:first-of-type ~ ul h5:before,
    h2:first-of-type ~ ul h6:before { content: ""; }

</style>