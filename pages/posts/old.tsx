import { getAllPostIds, getPostData } from '../../lib/posts'
import Head from 'next/head'
import Date from '../../components/date'
import React, { Component } from "react";
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import ReactMarkdown from 'react-markdown'
import { Heading, HStack, VStack, Avatar, Text, Button } from '@chakra-ui/react'
import title from '../../styles/Home.module.css'
import Link from 'next/link'
import { allPosts } from 'contentlayer/generated'

export class Comments extends Component {

  componentDidMount() {
    let script = document.createElement("script");
    let anchor = document.getElementById("inject-comments-for-uterances");
    script.setAttribute("src", "https://utteranc.es/client.js");
    script.setAttribute("crossorigin", "anonymous");
    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
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

export default function Post({ post }) {
  console.log(post)
  return (
    <>
      <Head>
        <title> - Blog | JacobHQ</title>
        <meta name="author" content={post.author} />
      </Head>
      <article>
        <Heading className={title.h1}>{post.title}</Heading>
        <HStack>
          <Avatar name={post.author} src={post.avatar} size="xs" />
          <Text>
            {post.author} • <Date dateString={post.date} />
          </Text>
        </HStack>
        <br />
        <br />
        <ReactMarkdown
          components={ChakraUIRenderer()}
          children={post.body}
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ components: any; children: any; escapeHtml... Remove this comment to see the full error message
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
  const paths = allPosts.map((post) => post.url)
  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const post = allPosts.find((post) => post._raw.flattenedPath === params.slug)
  return {
    props: {
      post,
    },
  }
}