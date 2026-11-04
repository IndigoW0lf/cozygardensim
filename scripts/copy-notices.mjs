import { copyFileSync } from 'node:fs';
copyFileSync('LICENSE', 'dist/LICENSE.txt');
copyFileSync('THIRD_PARTY_NOTICES.txt', 'dist/THIRD_PARTY_NOTICES.txt');
