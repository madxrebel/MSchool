/**
 * Real partner schools, loaded automatically from src/assets/schools/.
 * The school name is the file name with hyphens turned into spaces,
 * e.g. "The-Standard-School.jpg" -> "The Standard School".
 * To add a school: drop its logo (png/jpg/jpeg/webp/svg, ideally square) into that folder.
 */
const logoModules = import.meta.glob('../assets/schools/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export interface School {
  name: string;
  logo: string;
}

export const SCHOOLS: School[] = Object.entries(logoModules)
  .map(([path, logo]) => {
    const file = path.split('/').pop() || '';
    const name = file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ').trim();
    return { name, logo };
  })
  .sort((a, b) => a.name.localeCompare(b.name));
