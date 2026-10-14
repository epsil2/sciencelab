-- ScienceLab database schema for Supabase
-- Run this file in Supabase Dashboard > SQL Editor.
create extension if not exists pgcrypto;

create table if not exists public.child_profiles (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 40),
  age int not null check (age between 10 and 16),
  avatar text not null default '🧑‍🔬',
  created_at timestamptz not null default now()
);

create table if not exists public.progress (
  id uuid primary key default gen_random_uuid(),
  profile_id uuid not null references public.child_profiles(id) on delete cascade,
  experiment_id text not null,
  completed boolean not null default false,
  score int not null default 0 check (score between 0 and 100),
  updated_at timestamptz not null default now(),
  unique(profile_id, experiment_id)
);

alter table public.child_profiles enable row level security;
alter table public.progress enable row level security;

create policy "Parents manage their own child profiles" on public.child_profiles
  for all using (auth.uid() = parent_id) with check (auth.uid() = parent_id);

create policy "Parents manage progress for their profiles" on public.progress
  for all using (exists (select 1 from public.child_profiles p where p.id = progress.profile_id and p.parent_id = auth.uid()))
  with check (exists (select 1 from public.child_profiles p where p.id = progress.profile_id and p.parent_id = auth.uid()));
