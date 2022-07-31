import { CmsLink } from '../../cms/models';
import Link from '../components/Link';

interface MenuProps {
  menuItems: CmsLink[];
}

const Menu = ({ menuItems }: MenuProps) => {
  return (
    <nav>
      <ul>
        {menuItems.map((link) => (
          <li key={link.text}>
            <Link {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Menu;
