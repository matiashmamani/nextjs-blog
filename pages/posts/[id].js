import Head from 'next/head';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import Layout from '../../components/layout';
import utilStyles from '../../styles/utils.module.css';

export async function getStaticProps({ params }) {
    // Get Post Data from ONLY ONE [id]
    // And update props in this page component (Post in this case)
    const postData = await getPostData(params.id);
    return {
        props: {
        postData,
        },
    };
}

export async function getStaticPaths(){
     // Get all possible paths and populate params in getStaticProps
    const paths = getAllPostIds();
    return {
        paths,
        fallback: false
    };
}

export default function Post({ postData }){
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}