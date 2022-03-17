import { MonthDto } from '@clemann-developments/dtos/expense-tracker-dtos';
import useListMonthExpenses from '../../api-services/month/listMonthExpenses.service';
import styles from './month.module.scss';

export default function MonthExpensesSection({
    monthDto
}: {
    monthDto: MonthDto;
}) {
    const listMonthExpenses = useListMonthExpenses({
        monthId: monthDto.monthId
    });

    return (
        <div className={styles.monthExpensesTable}>
            <div className={styles.expensesTableHeaderRow}>
                <div
                    className={styles.expensesTableHeader}
                    style={{
                        width: '3rem'
                    }}
                ></div>
                <div
                    className={styles.expensesTableHeader}
                    style={{
                        width: '6rem'
                    }}
                >
                    Date
                </div>
            </div>
            {/* <Table
            isLoading={listMonthExpenses.apiService.isLoading}
            headers={
                <>
                    <ColumnHeader
                        width="3rem"
                    ></ColumnHeader>
                    <ColumnHeader
                        width="6rem"
                        header="Date"
                        sortKey="day"
                        listService={listMonthExpenses}
                    ></ColumnHeader>
                    <ColumnHeader
                        width="30%"
                        header="Item"
                        sortKey="name"
                        listService={listMonthExpenses}
                    ></ColumnHeader>
                    <ColumnHeader width="10%" header="Players"></ColumnHeader>
                    <ColumnHeader width="10%" header="Actions"></ColumnHeader>
                </>
            }
            rows={
                <>
                    {listLeagues?.rows?.map((row) => (
                        <TableRow
                            key={row.leagueId}
                            clickHandler={() =>
                                router.push(`leagues/${row.leagueId}`)
                            }
                        >
                            <Column data={row.name}>
                                <div>{row.name}</div>
                                <div className="key-display">
                                    {row.leagueId}
                                </div>
                            </Column>
                            <Column>
                                <span>
                                    {row.city}, {row.state}
                                </span>
                            </Column>
                            <Column
                                data={row.userToLeague?.length || '0'}
                            ></Column>
                            <Column>
                                <div style={{ display: 'flex' }}>
                                    <div
                                        style={{
                                            marginRight: '2rem'
                                        }}
                                    >
                                        <Button
                                            appearance={ButtonAppearance.Icon}
                                            clickHandler={(event) => {
                                                event.stopPropagation();
                                                setShowLeagueForm(row);
                                            }}
                                        >
                                            <PencilAltIcon></PencilAltIcon>
                                        </Button>
                                    </div>

                                    <Button
                                        appearance={ButtonAppearance.Icon}
                                        linkColor="red"
                                        clickHandler={(event) => {
                                            event.stopPropagation();
                                            showModal(
                                                <DeleteLeagueModal
                                                    row={row}
                                                ></DeleteLeagueModal>
                                            );
                                        }}
                                    >
                                        <MinusCircleIcon></MinusCircleIcon>
                                    </Button>
                                </div>
                            </Column>
                        </TableRow>
                    ))}
                </>
            }
        ></Table> */}
        </div>
    );
}
