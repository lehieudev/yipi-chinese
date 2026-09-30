-- ============================================================
-- YIPI - DATABASE SCHEMA FOR SUPABASE
-- ============================================================

-- Bật extension để tạo UUID tự động (thường mặc định đã bật trên Supabase)
create extension if not exists "uuid-ossp";

-- 1. BẢNG PROFILES (Lưu thông tin hồ sơ người dùng)
-- Liên kết trực tiếp với bảng auth.users của Supabase
create table public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  full_name text,
  avatar_url text,
  target_hsk_level int default 1,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bật Row Level Security (RLS) để bảo mật dữ liệu
alter table public.profiles enable row level security;

create policy "Ai cũng có thể xem profiles." 
  on public.profiles for select using (true);

create policy "Người dùng có thể tự cập nhật profile của mình." 
  on public.profiles for update using (auth.uid() = id);

-- Trigger tự động tạo Profile khi có User mới đăng ký
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================

-- 2. BẢNG LESSONS (Lưu danh sách bài học tiếng Trung)
create table public.lessons (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  hsk_level int not null default 1,
  order_index int not null default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Bảo mật RLS cho bài học (Tất cả mọi người đều có thể đọc, chỉ Admin mới được thêm/sửa)
alter table public.lessons enable row level security;

create policy "Tất cả mọi người có thể xem bài học." 
  on public.lessons for select using (true);

-- ============================================================

-- 3. BẢNG USER_PROGRESS (Lưu tiến trình học tập của người dùng)
create table public.user_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  lesson_id uuid references public.lessons(id) on delete cascade not null,
  status text check (status in ('not_started', 'in_progress', 'completed')) default 'not_started',
  score int default 0,
  completed_at timestamp with time zone,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(user_id, lesson_id) -- Một người dùng chỉ có 1 tiến trình cho 1 bài học
);

-- Bảo mật RLS cho tiến trình học (Chỉ người dùng mới xem và sửa được tiến trình của chính mình)
alter table public.user_progress enable row level security;

create policy "Người dùng có thể xem tiến trình của mình" 
  on public.user_progress for select using (auth.uid() = user_id);

create policy "Người dùng có thể thêm tiến trình của mình" 
  on public.user_progress for insert with check (auth.uid() = user_id);

create policy "Người dùng có thể cập nhật tiến trình của mình" 
  on public.user_progress for update using (auth.uid() = user_id);
