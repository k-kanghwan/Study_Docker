- 특정 포트로 컨테이너 실행

```bash
docker run -d -p {port}:80 --name {container_name} --rm {image_name}
```

- 모든 컨테이너 삭제

```bash
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```

- 주피터 노트북 실행 
```bash
docker run -p 8888:8888 -v {host_directory}:{container_directory} jupyter/datascience-notebook
docker run --rm -d -p 8888:8888 -v /home/ubuntu/2025_LEARN:/home/jovyan/work jupyter/datascience-notebook
```