import { library } from '@fortawesome/fontawesome-svg-core';

// Import all free icon sets
import * as solidIcons from '@fortawesome/free-solid-svg-icons';
import * as regularIcons from '@fortawesome/free-regular-svg-icons';
import * as brandIcons from '@fortawesome/free-brands-svg-icons';

// Add all solid icons to the library
Object.values(solidIcons).forEach((icon: any) => {
  if (icon.iconName && icon.prefix) {
    library.add(icon);
  }
});

// Add all regular icons to the library
Object.values(regularIcons).forEach((icon: any) => {
  if (icon.iconName && icon.prefix) {
    library.add(icon);
  }
});

// Add all brand icons to the library
Object.values(brandIcons).forEach((icon: any) => {
  if (icon.iconName && icon.prefix) {
    library.add(icon);
  }
});

// Export icon sets for direct access if needed
export { solidIcons, regularIcons, brandIcons };

// Export the FontAwesomeIcon component for convenience
export { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
