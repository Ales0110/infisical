## Развертывание проекта "Туда-сюда" 

- Копируем проект на локальную машину
```
git clone https://github.com/Ales0110/infisical.git
```

Меняем файлик main.tf под себя и запускаем
```
terraform main.tf
```

- Настриваем необходимые разрешения для базы данных в CloudSQL

- Выполняем развертывание приложенияпутем изменения под себя и запуска yaml файлов из папки k8s
```
kubectl apply -f backend-deployment.yaml
kubectl apply -f backend-ingress.yaml
kubectl apply -f backend-service.yaml
kubectl apply -f configmap-new.yaml
```

