import { createAsyncThunk } from '@reduxjs/toolkit';
import { EndPoints } from 'axios/api-config';
import { AntiHeroActionTypes, AntiHeroModel } from './anti-hero.types';

export const getAntiHeroesAction = createAsyncThunk(
  AntiHeroActionTypes.FETCH_ANTI_HEROES,
  async () => {
    return (await getAxios<AntiHeroModel>(EndPoints.antiHeroes)).data;
    /* same as*/
    // const {data} = await getAxios<AntiHeroModel>(EndPoints.antiHeroes);
    // return data;
    // or (await getAxios<AntiHeroModel>(EndPoints.antiHeroes)).data without the curly braces.
  },
);

export const postAntiHeroAction = createAsyncThunk(
  AntiHeroActionTypes.ADD_ANTI_HERO,
  async (antiHero: AntiHeroModel) => {
    return (await postAxios<AntiHeroModel>(EndPoints.antiHeroes, antiHero))
      .data;
  },
);

export const deleteAntiHeroByIdAction = createAsyncThunk(
  AntiHeroActionTypes.REMOVE_ANTI_HERO_BY_ID,
  async (id: string) => {
    return await deleteAxios<void>(EndPoints.antiHeroes, id);
  },
);
