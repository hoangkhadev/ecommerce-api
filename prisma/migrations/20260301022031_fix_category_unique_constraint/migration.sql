-- DropIndex
DROP INDEX "categories_name_parent_id_key";

CREATE UNIQUE INDEX unique_root_category_name
ON categories(name)
WHERE parent_id IS NULL;

CREATE UNIQUE INDEX unique_category_name_parent
ON categories(name, parent_id)
WHERE parent_id IS NOT NULL;