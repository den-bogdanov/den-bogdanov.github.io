#!/bin/bash

# Скрипт для очистки дублирующихся изображений
# Использование: ./cleanup_images.sh

echo "Начинаю проверку изображений в директории static/images..."

# Создаем временную директорию
TEMP_DIR=$(mktemp -d)
trap 'rm -rf "$TEMP_DIR"' EXIT

# Проверяем все изображения в директории static/images
find static/images -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r image; do
  image_basename=$(basename "$image")
  
  # Пропускаем системные файлы
  if [[ "$image_basename" == .* ]]; then
    continue
  fi
  
  # Флаг для отслеживания, найден ли дубликат
  rm -f "$TEMP_DIR/found"
  
  # Получаем размер оригинального файла
  original_size=$(stat -f%z "$image")
  
  # Ищем файлы с таким же размером
  find static/posts -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r post_image; do
    # Если размеры совпадают, сравниваем содержимое
    if [ "$original_size" = "$(stat -f%z "$post_image")" ]; then
      if cmp -s "$image" "$post_image"; then
        echo "Найден дубликат: $image_basename -> $(basename "$(dirname "$(dirname "$post_image")")")/$(basename "$(dirname "$post_image")")/$(basename "$post_image")"
        touch "$TEMP_DIR/found"
        # Удаляем оригинальное изображение
        echo "Удаляю дублирующееся изображение: $image"
        rm "$image"
        break
      fi
    fi
  done
  
  # Если копия не найдена, сообщаем об этом
  if [ ! -f "$TEMP_DIR/found" ]; then
    echo "Изображение $image_basename не найдено в директориях постов, оставляю его"
  fi
done

echo "Очистка завершена!" 