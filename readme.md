_Синтаксис команды "docker compose" / "docker-compose" зависит от вашей конфигурации докера._

### Установка:
1. Установить docker
2. Склонировать репозиторий с проектом ```git clone https://github.com/Vafflee/aldi_bot```
3. Перейти в папку с проектом ```cd aldi_bot```
4. Сделать копию файла ".env.example" и назвать ее ".env"
5. Указать все необходимые параметры
	- TG_TOKEN - секретный токен для получения доступа к боту, созданному через @BotFather
	- YANDEX_PUBLIC_FOLDER_URL - ссылка на публичную папку яндекс диска (подробнее о ее структуре в конце)
	- PORT - внешний порт приложения с ботом (можно не менять)
	- POSTGRES_NAME - название базы данных postgres, которая будет создана при первом запуске контейнера
	- POSTGRES_USER - имя пользователя-администратора базы данных postgres, которая будет создана при первом запуске контейнера
	- POSTGRES_PASSWORD - пароль для пользователя-администратора базы данных postgres, которая будет создана при первом запуске контейнера
	- POSTGRES_PORT - внешний порт базы данных postgres
	
	Оставшиеся 2 параметра не менять, оставить такими же как в .env.example

5. Запустить команду ```docker compose up -d```

После успешного выполнения команды у вас должны появится 2 докер образа: postgres и aldi_bot-telegraf, а также должны запуститься 2 контейнера: postgres и telegraf.

### Обновление:
1. Остановить работающие контейнеры ```docker compose down```
2. Убедиться, что контейнеры остановлены (Они не должны выводиться в списке по команде ```docker ps```)
3. Скачать изменения с репозитория ```git pull```
4. Пересобрать контейнеры, выполнив команду ```docker compose build```
5. Запустить контейнеры командой ```docker compose up -d```

### О структуре яндекс диска:
Публичная папка на яндекс диске должна содержать в себе папки, каждая из которых отвечает за отдельный проект. Внутри каждой папки проекта должны лежать фотографии проекта и файл about.txt с описанием проекта (опционально).

Пример:
```
Публичная папка/
├─ Проект 1/
│  ├─ about.txt
│  ├─ photo1.jpg
│  ├─ photo2.png
├─ Проект 2/
│  ├─ about.txt
│  ├─ Фото 1.jpg
│  ├─ Фотография 2.png
├─ Проект 3/
│  ├─ Фотография.png

```
