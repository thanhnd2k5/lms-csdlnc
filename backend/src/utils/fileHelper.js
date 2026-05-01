const fs = require('fs').promises;
const path = require('path');

/**
 * Helper to safely delete files from the local filesystem
 */
const fileHelper = {
    /**
     * Delete a single file
     * @param {string} filePath - Path to the file (relative to backend root or absolute)
     */
    deleteFile: async (filePath) => {
        if (!filePath) return;

        try {
            // Resolve path: handle cases where path starts with /uploads/
            let absolutePath = filePath;
            if (!path.isAbsolute(filePath)) {
                // If it starts with /, remove it to make it relative to process.cwd()
                const cleanPath = filePath.startsWith('/') ? filePath.substring(1) : filePath;
                absolutePath = path.resolve(process.cwd(), cleanPath);
            }

            // Check if file exists before trying to delete
            try {
                await fs.access(absolutePath);
                await fs.unlink(absolutePath);
                console.log(`[FileHelper] Successfully deleted: ${absolutePath}`);
            } catch (err) {
                if (err.code === 'ENOENT') {
                    console.warn(`[FileHelper] File not found, skipping: ${absolutePath}`);
                } else {
                    throw err;
                }
            }
        } catch (error) {
            console.error(`[FileHelper] Error deleting file ${filePath}:`, error);
        }
    },

    /**
     * Delete multiple files
     * @param {string[]} filePaths - Array of file paths
     */
    deleteMultipleFiles: async (filePaths) => {
        if (!Array.isArray(filePaths) || filePaths.length === 0) return;
        
        console.log(`[FileHelper] Deleting ${filePaths.length} files...`);
        const deletePromises = filePaths.map(path => fileHelper.deleteFile(path));
        await Promise.all(deletePromises);
    }
};

module.exports = fileHelper;
