import logoImg from '../../assets/logo.svg'
import { Container , Content} from './styles'

interface Headerprops {
    onOpenNewTransactionModal: () => void;
}

export function Header({onOpenNewTransactionModal}: Headerprops){

    return(
        <Container>
            <Content>
                <img src={logoImg} alt="dtmoney" />
                <button type="button" onClick={onOpenNewTransactionModal }>
                    Nova transação
                </button>
            </Content>
        </Container>
    )
}