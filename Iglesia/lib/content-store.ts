"use client"

import { ContentStore, defaultContent, NewsItem, Event, CalendarEvent, GalleryImage, DonationInfo } from "./types"

const STORAGE_KEY = "parroquia-content"

// Get content from localStorage
export function getContent(): ContentStore {
  if (typeof window === "undefined") {
    return defaultContent
  }
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      return JSON.parse(stored)
    }
  } catch (error) {
    console.error("Error reading from localStorage:", error)
  }
  
  return defaultContent
}

// Save content to localStorage
export function saveContent(content: ContentStore): void {
  if (typeof window === "undefined") return
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  } catch (error) {
    console.error("Error saving to localStorage:", error)
  }
}

// Generate unique ID
function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// News CRUD
export function addNews(news: Omit<NewsItem, "id" | "createdAt">): NewsItem {
  const content = getContent()
  const newItem: NewsItem = {
    ...news,
    id: generateId(),
    createdAt: Date.now(),
  }
  content.news.unshift(newItem)
  saveContent(content)
  return newItem
}

export function updateNews(id: string, updates: Partial<Omit<NewsItem, "id" | "createdAt">>): NewsItem | null {
  const content = getContent()
  const index = content.news.findIndex((n) => n.id === id)
  if (index === -1) return null
  
  content.news[index] = { ...content.news[index], ...updates }
  saveContent(content)
  return content.news[index]
}

export function deleteNews(id: string): boolean {
  const content = getContent()
  const index = content.news.findIndex((n) => n.id === id)
  if (index === -1) return false
  
  content.news.splice(index, 1)
  saveContent(content)
  return true
}

// Calendar dates CRUD
export function addCalendarDate(date: string): CalendarEvent {
  const content = getContent()
  const newItem: CalendarEvent = {
    id: generateId(),
    date,
    highlighted: true,
  }
  content.calendarDates.push(newItem)
  saveContent(content)
  return newItem
}

export function deleteCalendarDate(id: string): boolean {
  const content = getContent()
  const index = content.calendarDates.findIndex((c) => c.id === id)
  if (index === -1) return false
  
  content.calendarDates.splice(index, 1)
  saveContent(content)
  return true
}

// Events CRUD
export function addEvent(event: Omit<Event, "id" | "createdAt">): Event {
  const content = getContent()
  const newItem: Event = {
    ...event,
    id: generateId(),
    createdAt: Date.now(),
  }
  content.events.push(newItem)
  saveContent(content)
  return newItem
}

export function updateEvent(id: string, updates: Partial<Omit<Event, "id" | "createdAt">>): Event | null {
  const content = getContent()
  const index = content.events.findIndex((e) => e.id === id)
  if (index === -1) return null
  
  content.events[index] = { ...content.events[index], ...updates }
  saveContent(content)
  return content.events[index]
}

export function deleteEvent(id: string): boolean {
  const content = getContent()
  const index = content.events.findIndex((e) => e.id === id)
  if (index === -1) return false
  
  content.events.splice(index, 1)
  saveContent(content)
  return true
}

// Gallery CRUD
export function addGalleryImage(image: Omit<GalleryImage, "id" | "createdAt">): GalleryImage {
  const content = getContent()
  const newItem: GalleryImage = {
    ...image,
    id: generateId(),
    createdAt: Date.now(),
  }
  content.gallery.push(newItem)
  saveContent(content)
  return newItem
}

export function updateGalleryImage(id: string, updates: Partial<Omit<GalleryImage, "id" | "createdAt">>): GalleryImage | null {
  const content = getContent()
  const index = content.gallery.findIndex((g) => g.id === id)
  if (index === -1) return null
  
  content.gallery[index] = { ...content.gallery[index], ...updates }
  saveContent(content)
  return content.gallery[index]
}

export function deleteGalleryImage(id: string): boolean {
  const content = getContent()
  const index = content.gallery.findIndex((g) => g.id === id)
  if (index === -1) return false
  
  content.gallery.splice(index, 1)
  saveContent(content)
  return true
}

// Donation CRUD
export function getDonationInfo(): DonationInfo {
  const content = getContent()
  return content.donation
}

export function updateDonationInfo(updates: Partial<DonationInfo>): DonationInfo {
  const content = getContent()
  content.donation = { ...content.donation, ...updates }
  saveContent(content)
  return content.donation
}

// Reset to defaults
export function resetContent(): void {
  saveContent(defaultContent)
}
