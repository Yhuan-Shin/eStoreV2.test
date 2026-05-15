"use client";

import {
  Box,
  Button,
  Container,
  Grid,
  HStack,
  Text,
  VStack,
  Tabs,
} from "@chakra-ui/react";
import { FeaturedNews } from "@/components/featured-news";
import { NewsCard } from "@/components/news-card";
import { PrimaryMdButton, PrimaryMdFlexButton } from "st-peter-ui";

const NewsUpdates = () => {
  // Sample featured news data
  const featuredNews = {
    image: "/images/news-featured.jpg",
    title:
      "Cake meme reflects coronavirus absurdity in a world where death toll is surging",
    excerpt:
      "The post is a viral ribbon reporting hope-monitor cakes as symbolism with the surging coronavirus numbers. As people see deaths surging, they seek meaningful cultural symbols to manage the disruption happening to normal day-to-day life.",
    date: "3 months ago",
    readingTime: "5 min read",
    category: "Trending",
  };

  // Sample news items
  const newsItems = [
    {
      id: "1",
      image: "/images/news-1.jpg",
      title:
        "John Lewis to lead final journey across Edmund Pettus Bridge in procession",
      excerpt:
        "More on final journey across the famous bridge in Selma, Alabama. In 1965, John Lewis and others marched across this bridge in support of voting rights.",
      date: "3 weeks ago",
      readingTime: "4 min read",
      author: "By Staff",
    },
    {
      id: "2",
      image: "/images/news-2.jpg",
      title:
        "John Lewis, civil rights giant, crosses final bridge with one final march",
      excerpt:
        "Trends at the top of US news today by column and column in the year of 2020 that continues to define American culture and politics.",
      date: "3 weeks ago",
      readingTime: "5 min read",
      author: "By Staff",
    },
    {
      id: "3",
      image: "/images/news-3.jpg",
      title:
        "Tornado and rain marriages declared as formal disaster Houston looms Texas",
      excerpt:
        "The death toll of the disaster rises and looms still remains to be seen. Just outside of Houston looms a new challenge as farmers reassess.",
      date: "4 weeks ago",
      readingTime: "6 min read",
      author: "By Staff",
    },
    {
      id: "4",
      image: "/images/news-4.jpg",
      title:
        "20 Years Age, Storm Kills Hundred in the Oldest Computer from Hurricane",
      excerpt:
        "This year's updates of the 20th anniversary of the storm sequence of 2000 remains the oldest computer from Hurricane records on file.",
      date: "2 months ago",
      readingTime: "7 min read",
      author: "By Staff",
    },
    {
      id: "5",
      image: "/images/news-5.jpg",
      title: "Healthcare Initiative in Action",
      excerpt:
        "A comprehensive look at the latest healthcare initiatives and how they are helping communities across the region.",
      date: "2 weeks ago",
      readingTime: "5 min read",
      author: "By Staff",
    },
    {
      id: "6",
      image: "/images/news-6.jpg",
      title: "Community Development Projects Underway",
      excerpt:
        "Several community development projects are now underway aimed at improving neighborhoods and creating more opportunities.",
      date: "1 week ago",
      readingTime: "4 min read",
      author: "By Staff",
    },
  ];

  const locationNews = [
    { id: "1", title: "Local Leadership News", location: "Downtown District" },
    { id: "2", title: "Community Events Update", location: "City Center" },
    { id: "3", title: "Regional Health Initiative", location: "East Region" },
  ];

  const tabs = [
    { id: "latest", label: "News" },
    { id: "trends", label: "Blogs" },
    { id: "health", label: "Events" },
    { id: "health", label: "Announcements" },
  ];

  return (
    <Box bg="white" minH="100vh">
      {/* Header Section */}
      <Box bg="green.600" py={{ base: "8", md: "12" }} color="white">
        <Container maxW="container.xl">
          <VStack align="start" gap="2">
            <Text
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="600"
              colorPalette="green"
            >
              News & Updates
            </Text>
            <Text
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight="700"
              lineHeight="1.2"
            >
              Stay Informed with Latest News
            </Text>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              opacity="0.95"
              maxW="600px"
            >
              Get the latest news, updates, and announcements from our community
            </Text>
          </VStack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxW="container.xl" py={{ base: "8", md: "12" }}>
        {/* Featured News */}
        <FeaturedNews {...featuredNews} />

        {/* Tabs Navigation */}
        <Box
          mb={{ base: "8", md: "10" }}
          borderBottom="2px solid"
          borderColor="gray.200"
        >
          <HStack
            gap={{ base: "4", md: "6" }}
            overflowX="auto"
            _scrollbar={{
              width: "0",
            }}
          >
            {tabs.map((tab) => (
              <Button
                key={tab.id}
                variant="ghost"
                size="lg"
                textDecoration={"none"}
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="600"
                color="gray.600"
                px={{ base: "4", md: "6" }}
                py="3"
                borderBottomWidth="3px"
                borderBottomColor="transparent"
                borderRadius="0"
                _hover={{
                  color: "green.600",
                  borderBottomColor: "green.200",
                }}
                _active={{
                  color: "green.600",
                  borderBottomColor: "green.600",
                }}
                whiteSpace="nowrap"
              >
                {/* <Text>{tab.icon}</Text> */}
                <Text>{tab.label}</Text>
              </Button>
            ))}
          </HStack>
        </Box>

        {/* News Grid */}
        <Grid
          templateColumns={{
            base: "1fr",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={{ base: "6", md: "8" }}
          mb={{ base: "8", md: "12" }}
        >
          {newsItems.map((item) => (
            <NewsCard key={item.id} {...item} />
          ))}
        </Grid>

        {/* View More Section */}
        <HStack justify="center" pt={{ base: "6", md: "8" }}>
          <PrimaryMdButton
            fontSize={{ base: "md", md: "lg" }}
            px={{ base: "6", md: "8" }}
            py={{ base: "2", md: "3" }}
            _hover={{
              bg: "green.50",
            }}
          >
            View More News
          </PrimaryMdButton>
        </HStack>
      </Container>
    </Box>
  );
};

export default NewsUpdates;
