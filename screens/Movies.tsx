import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import styled from "styled-components/native"
import Swiper from 'react-native-web-swiper';
import { ActivityIndicator, Dimensions, FlatList, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import Slide from '../components/Slide';
import Poster from '../components/Poster';
import HMedia from "../components/HMedia";
import VMedia from "../components/VMedia";
import { useQuery, useQueryClient } from 'react-query';
import { Movie, MovieResponse, moviesApi } from '../api';
import Loader from "../components/Loader";
import HList from '../components/HList';


const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const ListTitle = styled.Text`
    color: white;
    font-size: 16px;
    font-weight: 600;
    margin-left: 30px;
`;

const TrendingScroll = styled.FlatList`
    margin-top: 20px;
`;

const ListContainer = styled.View`
    margin-bottom: 40px;
`;

const ComingSoonTitle = styled(ListTitle)`
    margin-bottom: 20px;
`;

const VSeparator = styled.View`
    width:20px;
`;
const HSeparator = styled.View`
    height:20px;
`;

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
    const queryClient = useQueryClient();
    const [ refreshing , setRefreshing] = useState(false);
    const { isLoading:nowPlayingLoading , data:nowPlayingData } = useQuery<MovieResponse>(["movies", "nowPlaying"], moviesApi.nowPlaying);
    const { isLoading:upcomingLoading , data:upcomingData } = useQuery<MovieResponse>(["movies", "upcoming"], moviesApi.upcoming);
    const { isLoading:trendingLoading , data:trendingData } = useQuery<MovieResponse>(["movies", "trending"], moviesApi.trending);

    const onRefresh = async() => {
        setRefreshing(true);
       await queryClient.refetchQueries(["movies"])
       setRefreshing(false);
    };

    const renderVMedia = ({ item }) => (
        <VMedia 
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            voteAverage={item.vote_average}
        />
    )

    const renderHMedia = ({ item }) => (
        <HMedia
            key={item.id}
            posterPath={item.poster_path}
            originalTitle={item.original_title}
            overview={item.overview}
            releaseDate={item.release_date}
            fullData={item}
        />
    );

    const loading = nowPlayingLoading || upcomingLoading || trendingLoading;

    return loading ? (
        <Loader />  
    ) : (
        upcomingData ? (<FlatList
            onRefresh={onRefresh}
            refreshing={refreshing}
            ListHeaderComponent={<>
                <Swiper
                    horizontal 
                    loop 
                    autoplay
                    autoplayTimeout={3.5} 
                    showButtons={false} 
                    showPagination={false}
                    controlsEnabled={false}
                    containerStyle={{
                        marginBottom: 30, width:"100%", height: SCREEN_HEIGHT / 4}}>
                        {nowPlayingData?.results.map((movie) => 
                            <Slide key={movie.id}
                            backdrop_path={movie.backdrop_path || ""}
                            poster_path={movie.poster_path || ""}
                            original_title={movie.original_title}
                            vote_average={movie.vote_average}
                            overview={movie.overview}
                            fullData={movie}
                            ></Slide>
                        )}
                    </Swiper>
                    {trendingData ? ( 
                        <HList title="Trending Movies" data={trendingData.results} /> 
                    ) : null}
                    <ComingSoonTitle>Coming Soon</ComingSoonTitle>
            </>}
            data={upcomingData.results}
            keyExtractor={(item) => item.id + ""}
            ItemSeparatorComponent={HSeparator}
            renderItem={renderHMedia}
        >
            
        </FlatList>
    ) : null);
}

    

export default Movies;






//npm i react-native-web-swiper --save