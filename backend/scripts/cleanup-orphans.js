const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config();

/**
 * Script to find and clean up orphaned static files
 * Run with: node scripts/cleanup-orphans.js [--delete]
 */

const UPLOAD_DIRS = [
    'uploads/avatars',
    'uploads/thumbnails',
    'uploads/documents',
    'uploads/class-thumbnails'
];

async function cleanup() {
    const isDeleteMode = process.argv.includes('--delete');
    
    console.log('--- Starting Orphaned Files Cleanup ---');
    if (isDeleteMode) {
        console.log('!!! RUNNING IN DELETE MODE !!!');
    } else {
        console.log('(Dry Run: Use --delete flag to actually remove files)');
    }

    let connection;
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 3306,
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: process.env.DB_NAME || 'lms'
        });

        // 1. Thu thập tất cả file path từ Database
        const usedFiles = new Set();

        const [users] = await connection.execute('SELECT avatar FROM users WHERE avatar IS NOT NULL');
        users.forEach(u => usedFiles.add(normalizePath(u.avatar)));

        const [courses] = await connection.execute('SELECT thumbnail FROM courses WHERE thumbnail IS NOT NULL');
        courses.forEach(c => usedFiles.add(normalizePath(c.thumbnail)));

        const [classes] = await connection.execute('SELECT thumbnail FROM classes WHERE thumbnail IS NOT NULL');
        classes.forEach(c => usedFiles.add(normalizePath(c.thumbnail)));

        const [documents] = await connection.execute('SELECT file_path FROM documents WHERE file_path IS NOT NULL');
        documents.forEach(d => usedFiles.add(normalizePath(d.file_path)));

        console.log(`[DB] Found ${usedFiles.size} files in use.`);

        // 2. Quét các thư mục uploads
        let totalScanned = 0;
        let orphanedCount = 0;
        let totalSavedSpace = 0;

        for (const dir of UPLOAD_DIRS) {
            const absoluteDir = path.resolve(process.cwd(), dir);
            if (!fs.existsSync(absoluteDir)) {
                console.log(`[FS] Directory not found: ${dir}`);
                continue;
            }

            const files = fs.readdirSync(absoluteDir);
            console.log(`[FS] Scanning ${dir} (${files.length} files)...`);

            for (const file of files) {
                totalScanned++;
                const relativePath = `${dir}/${file}`;
                const normalizedPath = normalizePath(relativePath);

                if (!usedFiles.has(normalizedPath)) {
                    orphanedCount++;
                    const fullPath = path.join(absoluteDir, file);
                    const stats = fs.statSync(fullPath);
                    totalSavedSpace += stats.size;

                    if (isDeleteMode) {
                        fs.unlinkSync(fullPath);
                        console.log(`[DELETED] ${relativePath}`);
                    } else {
                        console.log(`[ORPHANED] ${relativePath} (${(stats.size / 1024).toFixed(2)} KB)`);
                    }
                }
            }
        }

        console.log('--- Summary ---');
        console.log(`Total scanned: ${totalScanned}`);
        console.log(`Orphaned files found: ${orphanedCount}`);
        console.log(`Total space to be saved: ${(totalSavedSpace / 1024 / 1024).toFixed(2)} MB`);
        
        if (!isDeleteMode && orphanedCount > 0) {
            console.log('Run with --delete to clean up these files.');
        }

    } catch (error) {
        console.error('Cleanup failed:', error);
    } finally {
        if (connection) await connection.end();
    }
}

/**
 * Normalize path for comparison (strip leading slash, handle backslashes)
 */
function normalizePath(p) {
    if (!p) return '';
    let clean = p.trim().replace(/\\/g, '/');
    if (clean.startsWith('/')) {
        clean = clean.substring(1);
    }
    return clean;
}

cleanup();
