import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { HTMLProps, ReactNode } from 'react';

interface LinkProps extends HTMLProps<HTMLAnchorElement> {
  href: string;
  text?: string;
  className?: string;
  children?: ReactNode;
}

const Link = ({ text, href, children, ...props }: LinkProps) => {
  const router = useRouter();

  if (!href) {
    console.error('Link component requires a href prop', {
      text,
      children,
      props,
    });
    return process.env.NODE_ENV === 'development' ? (
      <span>Missing Link</span>
    ) : null;
  }

  // hash links
  if (href.indexOf('#') > -1) {
    const [link, hash] = href.split('#');
    const routerLink = router.asPath.split('#')[0].replace(/^\//, '');

    // same page, so hijack and scroll
    if (routerLink === link) {
      return (
        <NextLink href={href}>
          <a
            href={href}
            onClick={(e) => {
              e.preventDefault();

              // if mobile menu, close so we can scroll
              if (document.documentElement.classList.contains('menuOpen')) {
                document.documentElement.classList.remove('menuOpen');
                router.push(routerLink, undefined, { shallow: true });
              }

              document
                .getElementById(hash)
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
            {...props}
          >
            {text || children}
          </a>
        </NextLink>
      );
    }
  }

  if (
    href.indexOf('http') !== 0 &&
    href.indexOf('/') !== 0 &&
    href.indexOf('mailto') !== 0 &&
    href.indexOf('tel') !== 0
  ) {
    href = `/${href}`;
  }

  return (
    <NextLink href={href}>
      <a {...props}>{children || text}</a>
    </NextLink>
  );
};

export default Link;
