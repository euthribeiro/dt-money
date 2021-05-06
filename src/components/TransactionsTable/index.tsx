import { useEffect } from "react";
import { api } from "../../services";
import { Container } from "./style";


export function TransactionTable() {

    useEffect(() => {
        api.get('transactions')
            .then((response) => console.log(response.data));
    }, []);

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Valor</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            Desenvolvimento de website
                        </td>
                        <td className="deposit">R$ 12000,00</td>
                        <td>Desenvolvimento</td>
                        <td>20/02/2012</td>
                    </tr>
                    <tr>
                        <td>
                            Aluguel
                        </td>
                        <td className="withdraw">- R$ 400,00</td>
                        <td>Desenvolvimento</td>
                        <td>20/02/2012</td>
                    </tr>
                </tbody>
            </table>
        </Container>
    )
}