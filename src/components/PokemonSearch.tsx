import React, {Component} from 'react';
import User from '../interfaces/User.interface';

interface SearchState {
    error: boolean,
    name: string,
    numberOfAbilites: number,
    baseExperience: number,
    imageUrl: string
}

class PokemonSearch extends Component<User, SearchState> {
    pokemonRef: React.RefObject<HTMLInputElement>;
    constructor(props: User) {
        super(props);
        this.state = {
            error: false,
            name: '',
            numberOfAbilites: 0,
            baseExperience: 0,
            imageUrl: ''
        };
        this.pokemonRef = React.createRef();
    }
    onSearchClick = () => {
        const inputValue = this.pokemonRef.current.value;
        fetch( `https://pokeapi.co/api/v2/pokemon/${inputValue}`)
            .then(res => {
                if(res.status !== 200) {
                    this.setState({error: true});
                    return;
                }
            });
    };

    render() {
        const {name, numberOfPokemons} = this.props;
        return (
            <div>
                <p>User {name} {numberOfPokemons && <span>has {numberOfPokemons} pokemons</span>} </p>
                <input type="text" ref={this.pokemonRef}/>
                <button onClick={this.onSearchClick} className="my-button">
                    Search
                </button>
            </div>
        );
    }
}

export default PokemonSearch;
