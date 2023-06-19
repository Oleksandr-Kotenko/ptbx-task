import Select from 'components/Select';
import ItemsContainer from 'components/ItemsContainer';
import {useSearchParams} from 'react-router-dom';

export default function Root() {
    const [search, setSearch] = useSearchParams();

    return (
        <div className="mw9 center ph4 bg-white min-vh-100 br bl b--light-gray">
            <div className="flex bb b--black-10 justify-between items-center mb4">

                <div className="items-center flex">
                    <h3>Filter By</h3>
                    <div className="ml2">
                        <Select
                            onChange={(e) => {
                                const val = e.target.value;
                                if (val !== 'all') {
                                    search.set('border', e.target.value);
                                } else {
                                    search.delete('border');
                                }

                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                            label="border"
                            name="border"
                            options={[
                                {
                                    label: 'all',
                                    value: 'all'
                                },
                                {
                                    label: 'no-border',
                                    value: 'false',
                                },
                                {
                                    label: 'border',
                                    value: 'true',
                                },
                            ]}
                        />
                    </div>
                    <div className="ml2">
                        <Select
                            onChange={(e) => {
                                search.set('texture', e.target.value);
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                            label="texture"
                            name="texture"
                            options={[
                                {
                                    label: 'not applied',
                                    value: 'not applied',
                                },
                                {
                                    label: 'canvass',
                                    value: 'canvas',
                                },
                                {
                                    label: 'glossy',
                                    value: 'glossy',
                                },
                            ]}
                        />
                    </div>
                </div>
                <div className="mr3 ml-auto items-center flex">
                    <div className="mr2">
                        <Select
                            onChange={(e) => {
                                search.set('sortBy', e.target.value);
                                setSearch(search, {
                                    replace: true,
                                });
                            }}
                            label="sort by"
                            name="sort"
                            options={[
                                {
                                    label: 'category',
                                    value: 'category',
                                },
                                {
                                    label: 'orders',
                                    value: 'orders',
                                },
                            ]}
                        />
                    </div>
                    <Select
                        onChange={(e) => {
                            search.set('sortOrder', e.target.value);
                            setSearch(search, {
                                replace: true,
                            });
                        }}
                        label="Sort order"
                        name="sort order"
                        options={[
                            {
                                label: 'ASC',
                                value: 'asc',
                            },
                            {
                                label: 'DESC',
                                value: 'desc',
                            },
                        ]}
                    />
                </div>

            </div>

            <div className="flex">
                <ItemsContainer/>
            </div>
        </div>
    );
}
