import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
    }),
    { name: 'theme-storage' }
  )
);

interface UIState {
  sidebarOpen: boolean;
  chatOpen: boolean;
  searchOpen: boolean;
  notificationsOpen: boolean;
  toggleSidebar: () => void;
  toggleChat: () => void;
  toggleSearch: () => void;
  toggleNotifications: () => void;
  closeAll: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: false,
      chatOpen: false,
      searchOpen: false,
      notificationsOpen: false,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      toggleChat: () => set((state) => ({ chatOpen: !state.chatOpen })),
      toggleSearch: () => set((state) => ({ searchOpen: !state.searchOpen })),
      toggleNotifications: () => set((state) => ({ notificationsOpen: !state.notificationsOpen })),
      closeAll: () => set({ sidebarOpen: false, chatOpen: false, searchOpen: false, notificationsOpen: false }),
    }),
    { name: 'ui-storage' }
  )
);

interface UserState {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    image?: string;
  } | null;
  profile: {
    id: string;
    headline?: string;
    hourlyRate?: number;
    rating?: number;
    totalEarnings?: number;
    projectCount?: number;
    completionStatus?: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  setProfile: (profile: UserState['profile']) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      profile: null,
      setUser: (user) => set({ user }),
      setProfile: (profile) => set({ profile }),
      clearUser: () => set({ user: null, profile: null }),
    }),
    { name: 'user-storage' }
  )
);

interface Notification {
  id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  removeNotification: (id: string) => void;
  clearAll: () => void;
}

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      unreadCount: 0,
      addNotification: (notification) => {
        const newNotification: Notification = {
          ...notification,
          id: crypto.randomUUID(),
          read: false,
          createdAt: new Date().toISOString(),
        };
        set((state) => ({
          notifications: [newNotification, ...state.notifications].slice(0, 50),
          unreadCount: state.unreadCount + 1,
        }));
      },
      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1),
        })),
      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),
      removeNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read
              ? state.unreadCount - 1
              : state.unreadCount,
          };
        }),
      clearAll: () => set({ notifications: [], unreadCount: 0 }),
    }),
    { name: 'notification-storage' }
  )
);

interface SwipeState {
  currentIndex: number;
  swipes: { projectId: string; direction: 'left' | 'right' | 'up' }[];
  setCurrentIndex: (index: number) => void;
  addSwipe: (projectId: string, direction: 'left' | 'right' | 'up') => void;
  resetSwipes: () => void;
}

export const useSwipeStore = create<SwipeState>()(
  persist(
    (set) => ({
      currentIndex: 0,
      swipes: [],
      setCurrentIndex: (index) => set({ currentIndex: index }),
      addSwipe: (projectId, direction) =>
        set((state) => ({
          swipes: [...state.swipes, { projectId, direction }],
        })),
      resetSwipes: () => set({ currentIndex: 0, swipes: [] }),
    }),
    { name: 'swipe-storage' }
  )
);

interface ChatState {
  rooms: {
    id: string;
    name: string;
    avatar?: string;
    lastMessage?: string;
    lastMessageAt?: string;
    unreadCount: number;
  }[];
  activeRoomId: string | null;
  setActiveRoom: (roomId: string | null) => void;
  setRooms: (rooms: ChatState['rooms']) => void;
  updateRoom: (roomId: string, updates: Partial<ChatState['rooms'][0]>) => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      rooms: [],
      activeRoomId: null,
      setActiveRoom: (roomId) => set({ activeRoomId: roomId }),
      setRooms: (rooms) => set({ rooms }),
      updateRoom: (roomId, updates) =>
        set((state) => ({
          rooms: state.rooms.map((room) =>
            room.id === roomId ? { ...room, ...updates } : room
          ),
        })),
    }),
    { name: 'chat-storage' }
  )
);

interface KanbanState {
  columns: {
    id: string;
    title: string;
    items: {
      id: string;
      title: string;
      description?: string;
      status: string;
      priority: 'low' | 'medium' | 'high';
      dueDate?: string;
      assignee?: {
        id: string;
        name: string;
        avatar?: string;
      };
    }[];
  }[];
  setColumns: (columns: KanbanState['columns']) => void;
  moveItem: (itemId: string, fromColumn: string, toColumn: string) => void;
}

export const useKanbanStore = create<KanbanState>()(
  persist(
    (set) => ({
      columns: [
        { id: 'todo', title: 'To Do', items: [] },
        { id: 'in-progress', title: 'In Progress', items: [] },
        { id: 'review', title: 'Review', items: [] },
        { id: 'paid', title: 'Paid', items: [] },
      ],
      setColumns: (columns) => set({ columns }),
      moveItem: (itemId, fromColumn, toColumn) =>
        set((state) => {
          const newColumns = [...state.columns];
          const fromColIndex = newColumns.findIndex((c) => c.id === fromColumn);
          const toColIndex = newColumns.findIndex((c) => c.id === toColumn);
          if (fromColIndex === -1 || toColIndex === -1) return state;

          const itemIndex = newColumns[fromColIndex].items.findIndex((i) => i.id === itemId);
          if (itemIndex === -1) return state;

          const [item] = newColumns[fromColIndex].items.splice(itemIndex, 1);
          newColumns[toColIndex].items.push(item);
          return { columns: newColumns };
        }),
    }),
    { name: 'kanban-storage' }
  )
);