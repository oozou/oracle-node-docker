from sqlalchemy import create_engine, MetaData, Table, Column, Integer, ForeignKey, String

user = 'sys'
password = 'Oradoc_db1'

cstr = 'oracle://{user}:{password}@db/sdon?mode=SYSDBA'.format(
    user=user,
    password=password
)

engine = create_engine(
    cstr,
    convert_unicode=False,
    pool_recycle=10,
    pool_size=50,
    max_identifier_length=128
)

result = engine.execute("select UPPER('This is a string') from dual")

for row in result:
    print(row)

metadata = MetaData()

customer = Table(
    'customer', metadata,
    Column('id', Integer, primary_key=True),
    Column('name', String(16), nullable=False),
    Column('email_address', String(60), key='email'),
    Column('nickname', String(50), nullable=False)
)

customer_prefs = Table(
    'customer_prefs', metadata,
    Column('pref_id', Integer, primary_key=True),
    Column(
        'customer_id',
        Integer,
        ForeignKey("customer.id"),
        nullable=False
    ),
    Column('pref_name', String(40), nullable=False),
    Column('pref_value', String(100))
)

# metadata.create_all(engine)
# metadata.drop_all(engine)
