# i3lock-color-editor

Данный инструмент не идеален и имеет некоторые неточности, его основная цель немного помочь вам менее болезннено настроить i3lock-color

## Использование

Откройте редактор [i3lock-color-editor](https://exynil.github.io/i3lock-editor/)

Настройте по своим предпочтениям

Нажмите Export для получения конфига.

## Добавление своих шрифтов


В консоли браузера запустите функцию прописав необходимые шрифты

```
main.importFonts(["JetBrains Mono", "Terminus (TTF)"])
```


Команда для получения отформатированного списка шрифтов для вставки в функцию

```
fc-list | cut -d ':' -f 2 | cut -d ',' -f 2 | sed 's/^ //' | sed 's/.*/"&"/' | sort | uniq | paste -d, -s
```

Команда для получения списка шрифтов

```
fc-list | cut -d ':' -f 2 | cut -d ',' -f 2 | sed 's/^ //' | sort | uniq
```