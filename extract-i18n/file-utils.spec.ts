import {promises as fs} from 'fs';
import {readFileIfExists} from './file-utils';
import {rmSafe} from './rm-safe';

describe('fileUtils', () => {
    it('should return file contents if file is present', async () => {
        try {
            await fs.writeFile('test.txt', 'test file content\nsecond line', 'utf8');
            const result = await readFileIfExists('test.txt');
            expect(result).toEqual('test file content\nsecond line');
        } finally {
            await rmSafe('test.txt');
        }
    });

    it('should return null if file does not exists', async () => {
        const result = await readFileIfExists('a-file-that-does-not-exist.txt');
        expect(result).toBeNull();
    });

    it('should throw any other error', async () => {
        await expectAsync(readFileIfExists('some-file.txt')).toBeResolved();
        await expectAsync(fs.readFile('some-file.txt')).toBeRejected();
    });
});
