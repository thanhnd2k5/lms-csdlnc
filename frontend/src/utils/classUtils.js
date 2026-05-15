import React from 'react';
import {
    BookOpen, Code, Terminal, Atom, Brain, Calculator, Languages, 
    Music, Palette, Microscope, Globe, Cpu, Database, 
    Cloud, Zap
} from 'lucide-react';

const SUBJECT_MAP = [
    { keywords: ['react', 'front-end', 'frontend', 'web'], icon: Atom, color: '#61DAFB' },
    { keywords: ['javascript', 'js', 'node'], icon: Code, color: '#F7DF1E' },
    { keywords: ['python', 'backend', 'django', 'flask'], icon: Terminal, color: '#3776AB' },
    { keywords: ['ai', 'intelligence', 'machine', 'data', 'brain'], icon: Brain, color: '#FF6B6B' },
    { keywords: ['database', 'sql', 'mongo'], icon: Database, color: '#4DB33D' },
    { keywords: ['math', 'số', 'toán'], icon: Calculator, color: '#FF9F43' },
    { keywords: ['english', 'anh văn', 'ngôn ngữ', 'languages'], icon: Languages, color: '#00D2FF' },
    { keywords: ['science', 'khoa học', 'vật lý', 'hóa học'], icon: Microscope, color: '#2ECC71' },
    { keywords: ['art', 'design', 'thiết kế', 'ui', 'ux'], icon: Palette, color: '#FF5E5E' },
    { keywords: ['music', 'nhạc'], icon: Music, color: '#A29BFE' },
    { keywords: ['cloud', 'aws', 'azure'], icon: Cloud, color: '#0984E3' },
    { keywords: ['network', 'mạng', 'internet'], icon: Globe, color: '#00CEC9' },
    { keywords: ['hardware', 'phần cứng', 'cpu'], icon: Cpu, color: '#636E72' },
    { keywords: ['performance', 'tối ưu', 'zap'], icon: Zap, color: '#FDCB6E' },
];

export const THUMBNAIL_TEMPLATES = [
    { id: 'react', title: 'React 3D', url: '/assets/default-thumbnails/react-3d.png' },
    { id: 'python', title: 'Python 3D', url: '/assets/default-thumbnails/python-3d.png' },
    { id: 'uiux', title: 'UI/UX 3D', url: '/assets/default-thumbnails/uiux-3d.png' },
    { id: 'science', title: 'Science 3D', url: '/assets/default-thumbnails/science-3d.png' },
];

export const getClassIllustration = (name) => {
    const lowerName = name?.toLowerCase() || '';
    const match = SUBJECT_MAP.find(subject => 
        subject.keywords.some(keyword => lowerName.includes(keyword))
    );
    
    if (match) {
        return {
            icon: match.icon,
            color: match.color
        };
    }
    
    return {
        icon: BookOpen,
        color: '#6366f1'
    };
};

export const getMeshGradient = (name) => {
    let hash = 0;
    const str = name || 'default';
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const h = Math.abs(hash) % 360;
    const s = 65 + (Math.abs(hash) % 15);
    const l = 55 + (Math.abs(hash) % 10);
    
    const color1 = `hsl(${h}, ${s}%, ${l}%)`;
    const color2 = `hsl(${(h + 45) % 360}, ${s}%, ${l - 10}%)`;
    const color3 = `hsl(${(h - 45 + 360) % 360}, ${s + 10}%, ${l + 10}%)`;
    
    return `radial-gradient(at 0% 0%, ${color1} 0px, transparent 50%),
            radial-gradient(at 50% 0%, ${color2} 0px, transparent 50%),
            radial-gradient(at 100% 0%, ${color3} 0px, transparent 50%),
            ${color1}`;
};
