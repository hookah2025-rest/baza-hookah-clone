-- Add note field to menu_categories table
ALTER TABLE public.menu_categories 
ADD COLUMN note TEXT;