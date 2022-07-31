import { createElement } from 'react';
import classNames from 'classnames';
import htmlReactParser, {
  HTMLReactParserOptions,
  Element,
} from 'html-react-parser';
import Link from './Link';
import styles from '../../styles/components/components/RichText.module.scss';

interface RichTextProps {
  className?: string;
  tag?: string;
  wrap?: boolean;
  center?: boolean;
  children: string;
}

const htmlReactParserOptions: HTMLReactParserOptions = {
  replace: (domNode) => {
    if (domNode instanceof Element && domNode.attribs) {
      switch (domNode.name) {
        case 'nextjs-link':
          const props = JSON.parse(domNode.attribs.data);
          return <Link {...props} className="button" />;
      }
    }
  },
};

const RichText = ({
  className = '',
  tag,
  wrap,
  center = false,
  children,
}: RichTextProps) => {
  let reactChildren = htmlReactParser(children, htmlReactParserOptions);
  if (
    typeof reactChildren === 'object' &&
    tag &&
    'type' in reactChildren &&
    reactChildren.type !== tag
  ) {
    reactChildren = createElement(tag, reactChildren.props);
  }

  return wrap ? (
    <div
      className={classNames(styles.richText, {
        [className]: className,
        center,
      })}
    >
      {reactChildren}
    </div>
  ) : (
    <>{reactChildren}</>
  );
};

export default RichText;
