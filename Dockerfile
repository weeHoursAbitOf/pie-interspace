#以nginx作为基础镜像
FROM nginx:latest
#将静态资源添加到镜像中
ADD dist /usr/share/nginx/html/dist
#对外暴露80端口
EXPOSE 80
#执行启动命令
CMD ["/usr/sbin/nginx","-g","daemon off;"]
