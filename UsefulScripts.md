- 모든 컨테이너 삭제 

```bash 
docker stop $(docker ps -a -q)
docker rm $(docker ps -a -q)
docker rmi $(docker images -q)
```
