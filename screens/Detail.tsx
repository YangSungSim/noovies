import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Text, View, Dimensions, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { LinearGradient } from 'expo-linear-gradient';
import { Movie, TV, moviesApi, tvApi } from "../api";
import Poster from "../components/Poster";
import { makeImgPath } from "../util";
import { BLACK_COLOR } from "../colors";
import { useQuery } from "react-query";
import Loader from "../components/Loader";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
    background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
    height: ${SCREEN_HEIGHT / 4}px;
    justify-content: flex-end;
    padding: 0px 20px;
`;

const Background = styled.Image``;

const Column =styled.View`
    flex-direction: row;
    width: 80%;
`;
const Title = styled.Text`
    color: white;
    font-weight: 36px;
    align-self: flex-end;
    margin-left: 15px;
    font-weight: 500;
`;
const Overview = styled.Text`
    color: ${(props) => props.theme.textColor};
    margin-top: 30px;
    padding: 0px 20px;
`;

const VideoBtn = styled.TouchableOpacity``;
const BtnText = styled.Text``;


type RootStackParamList = {
    Detail: Movie | TV;
};

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

const Detail: React.FC<DetailScreenProps> = ({ 
    navigation, 
    route: {
        params: {
            params
        }
    } 
}) => {
    const isMovie = "original_title" in params;
    const {isLoading, data} = useQuery(
        [isMovie ? "movies": "tv", params.id], 
        isMovie  ? moviesApi.detail: tvApi.detail);

    useEffect(() => {
        navigation.setOptions({ 
            title: 'original_title' in params 
            ? "Movie" 
            : "TV Show"
        });
    }, []);
    return (
        <Container>
            <Header>
                <Background 
                    style={StyleSheet.absoluteFill} 
                    source={{uri:makeImgPath(params.backdrop_path || "")}} 
                />
                <LinearGradient
                    colors={['transparent', BLACK_COLOR]}
                    style={StyleSheet.absoluteFill}
                />
                <Column>
                <Poster path={params.poster_path || ""} />
                <Title>{'original_title' in params 
                        ? params.original_title 
                        : params.original_name}
                </Title>
                </Column>
            </Header>
            <Overview>{params.overview}</Overview>
            {isLoading ? <Loader /> : null}
            {data?.videos?.results?.map((video) => (
                <VideoBtn key={video.key}>
                    <BtnText>{video.name}</BtnText>
                </VideoBtn>
            ))}
        </Container>
    );
};

export default Detail;