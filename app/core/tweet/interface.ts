import { ITweetRepository as ITweetRepositoryForAlbum } from 'app/albums/domains/models/type';
import { ITweetRepository as ITweetRepositoryForTicket } from 'app/tickets/domains/type';

export interface ITweetRepository extends ITweetRepositoryForAlbum, ITweetRepositoryForTicket {}
