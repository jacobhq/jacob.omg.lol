import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import React, {Component} from "react";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import {Heading} from '@chakra-ui/react'
import styles from '../../styles/Home.module.css'

export class Comments extends Component {

  componentDidMount () {
      let script = document.createElement("script");
      let anchor = document.getElementById("inject-comments-for-uterances");
      script.setAttribute("src", "https://utteranc.es/client.js");
      script.setAttribute("crossorigin","anonymous");
      script.setAttribute("async", true);
      script.setAttribute("repo", "jacobhq/blog");
      script.setAttribute("issue-term", "pathname");
      script.setAttribute( "theme", 'light');
      anchor.appendChild(script);
  }

  render() {
    return (
        <div id="inject-comments-for-uterances"></div>
    );
  }
}

export default function Post({ postData }) {
  return (
    <>
      <Head>
        <title>{postData.title} - Blog | JacobHQ</title>
      </Head>
      <article>
        <Heading className={styles.h1}>{postData.title}</Heading>
        <div>
          <Date dateString={postData.date} />
        </div>
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={postData.md}
          escapeHtml={false}
        />
        <Comments />
      </article>
    </>
  )
}

export async function getStaticPaths() {
  const paths = getAllPostIds()
  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id)
  return {
    props: {
      postData
    }
  }
}