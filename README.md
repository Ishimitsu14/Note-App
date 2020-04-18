# Note APP

## Установка
Перед началом разворачивания проекта нужно поставить [Git](https://git-scm.com/book/ru/v1/%D0%92%D0%B2%D0%B5%D0%B4%D0%B5%D0%BD%D0%B8%D0%B5-%D0%A3%D1%81%D1%82%D0%B0%D0%BD%D0%BE%D0%B2%D0%BA%D0%B0-Git), [Docker](https://docs.docker.com/install/)
и [Docker compose](https://docs.docker.com/compose/install/#install-compose).
Клонируем проект через Git (cli) или через какое нибудь сторонние приложение:

```bash
$ git clone git@github.com:Ishimitsu14/Note-App.git
```

В корне проекта находиться файл .env.example
Копируем этот файл в .env, и подставляем актуальные данные ( если это требуется ):

```bash
$ cp .env.example .env
```
## Запуск

Необходимо выполнить команду:

```bash
$ docker-compose up --build -d
```

После сборки проекта, приложение будет доступно по ссылке:
  `http://localhost:{NGINX_PORT}` - `{NGINX_PORT}`, это переменная из `.env` 
