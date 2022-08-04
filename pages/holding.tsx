import type { NextPage } from 'next';
import { NextSeo } from 'next-seo';
import Main from '../components/layout/Main';
import Hero from '../components/blocks/Hero';
import Icon from '../components/assets/Icon';
import { ILink } from '../@types/generated/contentful';

const Holding: NextPage = () => (
  <>
    <NextSeo
      title="Stormlight Studio | Coming Soon"
      description="New website coming soon"
    />
    <Main>
      <div
        style={{
          position: 'fixed',
          width: '80%',
          maxWidth: 300,
          height: 100,
          zIndex: 1,
          margin: 40,
        }}
      >
        <Icon name="logo" />
      </div>
      <Hero
        title="Time to get excited"
        description="Shiny new website coming soon..."
        cmsId="comingSoon"
        cmsReference="comingSoon"
        contentType="hero"
        hashId="comingSoon"
        button={
          {
            href: 'mailto:leanne@stormlightstudio.co.uk',
            text: 'Contact us now',
          } as ILink
        }
      />
    </Main>
  </>
);

export default Holding;
