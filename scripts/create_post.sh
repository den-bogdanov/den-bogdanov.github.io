#!/bin/bash

# Скрипт для создания нового поста в блоге
# Использование: ./create_post.sh "Название поста" "slug-поста" "YYYY-MM-DD" "image1.jpg,image2.jpg,..."

# Проверка аргументов
if [ $# -lt 4 ]; then
  echo "Использование: $0 \"Название поста\" \"slug-поста\" \"YYYY-MM-DD\" \"image1.jpg,image2.jpg,...\""
  exit 1
fi

TITLE="$1"
SLUG="$2"
DATE="$3"
IMAGES="$4"

# Создание директорий
mkdir -p "static/posts/$SLUG/images"
echo "Создана директория: static/posts/$SLUG/images"

# Обработка изображений
IFS=',' read -ra IMG_ARRAY <<< "$IMAGES"
for i in "${!IMG_ARRAY[@]}"; do
  IMG="${IMG_ARRAY[$i]}"
  # Проверка существования изображения
  if [ -f "static/images/$IMG" ]; then
    # Генерация имени для изображения
    NEW_NAME=$(echo "$SLUG-image-$((i+1))" | tr ' ' '-').jpg
    # Копирование изображения
    cp "static/images/$IMG" "static/posts/$SLUG/images/$NEW_NAME"
    echo "Скопировано изображение: $IMG -> $NEW_NAME"
    # Удаление оригинального изображения
    rm "static/images/$IMG"
    echo "Удалено оригинальное изображение: $IMG"
  else
    echo "Ошибка: Изображение $IMG не найдено в директории static/images/"
  fi
done

# Создание шаблона поста
cat > "content/posts/$SLUG.md" << EOF
---
title: "$TITLE"
date: $DATE
draft: false
tags: ["Tag1", "Tag2", "Tag3"]
categories: ["Category1", "Category2"]
description: "Краткое описание поста"
---

# $TITLE

![Main Image](/posts/$SLUG/images/${SLUG}-image-1.jpg)

Введение к посту...

## Раздел 1

Содержание раздела 1...

## Раздел 2

Содержание раздела 2...

## Заключение

Заключительные мысли...

---

Вопросы или комментарии? Поделитесь ими ниже!
EOF

echo "Создан шаблон поста: content/posts/$SLUG.md"
echo "Не забудьте отредактировать метаданные и содержимое поста!"

# Добавление файлов в Git
git add "content/posts/$SLUG.md" "static/posts/$SLUG/"
echo "Файлы добавлены в Git"

echo "Готово! Пост создан и готов к редактированию." 