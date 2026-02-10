'use client';

import { useState, useMemo } from 'react';
import * as LucideIcons from 'lucide-react';
import { Search, X, Check } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

// Curated list of icons for common web sections
const CURATED_ICONS = [
    'Target', 'Zap', 'Shield', 'Globe', 'Briefcase', 'Users', 'BarChart',
    'MessageSquare', 'Layers', 'Layout', 'Settings', 'Eye', 'Code', 'Cpu',
    'PenTool', 'Compass', 'Rocket', 'Award', 'Activity', 'Anchor', 'Aperture',
    'Archive', 'ArrowRight', 'AtSign', 'Bell', 'Bluetooth', 'Book', 'Bookmark',
    'Box', 'Camera', 'Cast', 'CheckCircle', 'ChevronRight', 'Cloud', 'Coffee',
    'CreditCard', 'Database', 'Download', 'Edit', 'ExternalLink', 'File',
    'Film', 'Filter', 'Flag', 'Folder', 'Gift', 'Grid', 'HardDrive',
    'Heart', 'HelpCircle', 'Home', 'Image', 'Inbox', 'Info', 'Key', 'Link',
    'List', 'Lock', 'Mail', 'Map', 'Mic', 'Monitor', 'Moon', 'Music',
    'Navigation', 'Package', 'Paperclip', 'Pause', 'Phone', 'Play', 'Power',
    'Printer', 'Radio', 'RefreshCw', 'Repeat', 'Search', 'Send', 'Server',
    'Share', 'ShoppingBag', 'ShoppingCart', 'Shuffle', 'SkipBack', 'SkipForward',
    'Slack', 'Slash', 'Sliders', 'Smartphone', 'Speaker', 'Star', 'StopCircle',
    'Sun', 'Sunrise', 'Sunset', 'Tablet', 'Tag', 'Terminal', 'ThumbsDown',
    'ThumbsUp', 'ToggleLeft', 'ToggleRight', 'Trash', 'Truck', 'Tv', 'Twitter',
    'Umbrella', 'Unlock', 'Upload', 'User', 'Video', 'Volume', 'Watch',
    'Wifi', 'Wind', 'Youtube'
];

interface IconPickerProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    onSelect: (iconName: string) => void;
    currentIcon?: string | null;
}

export function IconPicker({ isOpen, onOpenChange, onSelect, currentIcon }: IconPickerProps) {
    const [search, setSearch] = useState('');

    const filteredIcons = useMemo(() => {
        return CURATED_ICONS.filter(name =>
            name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    const handleSelect = (name: string) => {
        onSelect(name);
        onOpenChange(false);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="p-6 border-b">
                    <DialogTitle className="flex items-center justify-between">
                        <span>Select Icon</span>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-400" />
                        </button>
                    </DialogTitle>
                    <div className="relative mt-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search icons..."
                            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            autoFocus
                        />
                    </div>
                </DialogHeader>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-200">
                    <div className="grid grid-cols-5 gap-3">
                        {filteredIcons.map((name) => {
                            const IconComponent = (LucideIcons as any)[name];
                            if (!IconComponent) return null;

                            const isSelected = currentIcon === name;

                            return (
                                <button
                                    key={name}
                                    onClick={() => handleSelect(name)}
                                    className={`
                    flex flex-col items-center justify-center p-3 rounded-xl border transition-all group relative
                    ${isSelected
                                            ? 'border-blue-500 bg-blue-50 text-blue-600'
                                            : 'border-gray-100 hover:border-blue-200 hover:bg-blue-50/50 text-gray-600'
                                        }
                  `}
                                    title={name}
                                >
                                    <IconComponent className={`w-6 h-6 mb-1 ${!isSelected && 'group-hover:scale-110 transition-transform'}`} />
                                    <span className="text-[10px] text-gray-400 truncate w-full text-center">
                                        {name}
                                    </span>
                                    {isSelected && (
                                        <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-0.5">
                                            <Check className="w-3 h-3" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {filteredIcons.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                            <Search className="w-8 h-8 mx-auto mb-2 opacity-20" />
                            <p>No icons found matching "{search}"</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}
