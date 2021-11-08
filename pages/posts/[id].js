import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import React, { Component } from "react";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import { Heading, HStack, VStack, Avatar, Text, Button } from '@chakra-ui/react'
import title from '../../styles/Home.module.css'
import Link from 'next/link'

export class Comments extends Component {

  componentDidMount() {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    script.setAttribute("async", true);
    script.setAttribute("repo", "jacobhq/blog");
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("theme", 'light');
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
        <meta name="author" content={postData.author} />
      </Head>
      <article>
        <Heading className={title.h1}>{postData.title}</Heading>
        <HStack>
          <Avatar name={postData.author} src={postData.avatar} size="xs" />
          <Text>
            {postData.author} • <Date dateString={postData.date} />
          </Text>
        </HStack>
        <br />
        <br />
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={postData.md}
          escapeHtml={false}
        />
        <Link href="/">
          <Button variant="ghost" marginTop="50px">Go home →</Button>
        </Link>
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