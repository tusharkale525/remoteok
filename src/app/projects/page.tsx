'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Plus,
  GripVertical,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';

interface TaskItem {
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
}

interface Column {
  id: string;
  title: string;
  items: TaskItem[];
}

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'To Do',
    items: [
      {
        id: 'task-1',
        title: 'Set up project structure',
        description: 'Initialize Next.js project with TypeScript',
        status: 'todo',
        priority: 'high',
        dueDate: '2024-12-20',
      },
      {
        id: 'task-2',
        title: 'Design database schema',
        description: 'Create Prisma models for all entities',
        status: 'todo',
        priority: 'medium',
        dueDate: '2024-12-22',
      },
    ],
  },
  {
    id: 'in-progress',
    title: 'In Progress',
    items: [
      {
        id: 'task-3',
        title: 'Build authentication',
        description: 'Implement Supabase auth with OAuth',
        status: 'in-progress',
        priority: 'high',
        dueDate: '2024-12-25',
        assignee: { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop' },
      },
    ],
  },
  {
    id: 'review',
    title: 'Review',
    items: [
      {
        id: 'task-4',
        title: 'Landing page',
        description: 'Complete responsive landing page',
        status: 'review',
        priority: 'medium',
        assignee: { id: '1', name: 'John Doe' },
      },
    ],
  },
  {
    id: 'paid',
    title: 'Paid',
    items: [
      {
        id: 'task-5',
        title: 'API endpoints',
        description: 'Build REST API for user management',
        status: 'paid',
        priority: 'high',
        assignee: { id: '1', name: 'John Doe' },
      },
    ],
  },
];

function SortableTask({ task, onDelete }: { task: TaskItem; onDelete: (id: string) => void }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const priorityColors = {
    low: 'text-green-500',
    medium: 'text-yellow-500',
    high: 'text-red-500',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-card border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing"
    >
      <div className="flex items-start gap-3">
        <button {...attributes} {...listeners} className="mt-1 text-muted-foreground hover:text-foreground">
          <GripVertical className="size-4" />
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-medium text-sm">{task.title}</h4>
            <button
              onClick={() => onDelete(task.id)}
              className="text-muted-foreground hover:text-destructive"
            >
              <X className="size-4" />
            </button>
          </div>
          {task.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {task.description}
            </p>
          )}
          <div className="flex items-center gap-2 mt-3">
            <Badge
              variant="outline"
              className={`text-xs ${priorityColors[task.priority]} border-current`}
            >
              {task.priority}
            </Badge>
            {task.dueDate && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="size-3" />
                {new Date(task.dueDate).toLocaleDateString()}
              </span>
            )}
          </div>
          {task.assignee && (
            <div className="flex items-center gap-2 mt-3">
              <Avatar className="size-6">
                <AvatarImage src={task.assignee.avatar} />
                <AvatarFallback className="text-xs">{task.assignee.name.slice(0, 2)}</AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{task.assignee.name}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ColumnComponent({
  column,
  onAddTask,
  onDeleteTask,
}: {
  column: Column;
  onAddTask: (columnId: string, task: Omit<TaskItem, 'id'>) => void;
  onDeleteTask: (taskId: string) => void;
}) {
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      onAddTask(column.id, {
        title: newTaskTitle,
        status: column.id,
        priority: 'medium',
      });
      setNewTaskTitle('');
      setIsAddingTask(false);
    }
  };

  return (
    <div className="flex-1 min-w-[300px] max-w-[350px]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold flex items-center gap-2">
          {column.title}
          <Badge variant="secondary" className="ml-2">
            {column.items.length}
          </Badge>
        </h3>
        <Button
          variant="ghost"
          size="icon"
          className="size-8"
          onClick={() => setIsAddingTask(true)}
        >
          <Plus className="size-4" />
        </Button>
      </div>
      <SortableContext
        items={column.items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 min-h-[200px]">
          {column.items.map((task) => (
            <SortableTask key={task.id} task={task} onDelete={onDeleteTask} />
          ))}
          {isAddingTask && column.id === 'todo' && (
            <div className="bg-card border rounded-lg p-3">
              <Input
                placeholder="Task title..."
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
                autoFocus
              />
              <div className="flex gap-2 mt-3">
                <Button size="sm" onClick={handleAddTask}>
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsAddingTask(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </SortableContext>
    </div>
  );
}

export default function ProjectsPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    setColumns((prevColumns) => {
      const activeColumnIndex = prevColumns.findIndex((col) =>
        col.items.some((item) => item.id === activeId)
      );
      const overColumnIndex = prevColumns.findIndex((col) =>
        col.items.some((item) => item.id === overId)
      );

      if (activeColumnIndex === -1 || overColumnIndex === -1) return prevColumns;

      const activeColumn = prevColumns[activeColumnIndex];
      const overColumn = prevColumns[overColumnIndex];

      if (activeColumn.id === overColumn.id) {
        const activeItemIndex = activeColumn.items.findIndex((item) => item.id === activeId);
        const overItemIndex = overColumn.items.findIndex((item) => item.id === overId);

        return prevColumns.map((col, index) => {
          if (index !== activeColumnIndex) return col;
          return {
            ...col,
            items: arrayMove(col.items, activeItemIndex, overItemIndex),
          };
        });
      }

      const activeItem = activeColumn.items.find((item) => item.id === activeId);
      if (!activeItem) return prevColumns;

      return prevColumns.map((col, index) => {
        if (index === activeColumnIndex) {
          return {
            ...col,
            items: col.items.filter((item) => item.id !== activeId),
          };
        }
        if (index === overColumnIndex) {
          const overItemIndex = col.items.findIndex((item) => item.id === overId);
          const newItems = [...col.items];
          newItems.splice(overItemIndex + 1, 0, { ...activeItem, status: col.id });
          return {
            ...col,
            items: newItems,
          };
        }
        return col;
      });
    });
  };

  const handleAddTask = (columnId: string, task: Omit<TaskItem, 'id'>) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) =>
        col.id === columnId
          ? { ...col, items: [...col.items, { ...task, id: `task-${Date.now()}` }] }
          : col
      )
    );
  };

  const handleDeleteTask = (taskId: string) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => ({
        ...col,
        items: col.items.filter((item) => item.id !== taskId),
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Projects</h1>
              <p className="text-muted-foreground">Manage your work with Kanban boards</p>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="size-4 mr-2" />
                  New Task
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Task</DialogTitle>
                  <DialogDescription>Add a new task to your project board.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Task title..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <textarea
                      className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2 text-sm"
                      placeholder="Task description..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Priority</label>
                      <select className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm">
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Due Date</label>
                      <Input type="date" />
                    </div>
                  </div>
                  <Button className="w-full">Create Task</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <div className="flex gap-6 overflow-x-auto pb-8">
            {columns.map((column) => (
              <ColumnComponent
                key={column.id}
                column={column}
                onAddTask={handleAddTask}
                onDeleteTask={handleDeleteTask}
              />
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}