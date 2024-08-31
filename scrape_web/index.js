
import pornhub from '@justalk/pornhub-api';
const url = 'https://www.pornhub.com/view_video.php?viewkey=ph56fc59c124c0c';
const video = await pornhub.page(url, ['title', 'pornstars', 'download_urls']);