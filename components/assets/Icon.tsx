import { createElement, forwardRef, RefAttributes, SVGAttributes } from 'react';
import icons from '../../assets/icons';

interface IconProps {
  name: string;
}

const Icon = forwardRef<SVGElement, IconProps & SVGAttributes<SVGElement>>(
  ({ className, name }, ref) => {
    const icon = icons[name];
    if (!icon) {
      console.warn(`Icon ${name} doesn't exist`);

      return null;
    }

    const svg = createElement<
      RefAttributes<SVGElement> & SVGAttributes<SVGElement>
    >(icon, { className, ref });
    return name === 'divider' ? <div className="divider">{svg}</div> : svg;
  }
);

Icon.displayName = 'Icon';

export default Icon;
