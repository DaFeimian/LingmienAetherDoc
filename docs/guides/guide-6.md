---
title: Python MySQL
order: 6
group:
  title: 开发指南
  order: 3
---
python用`pymysql`超方便管理SQL数据库~支持py2.7.x py 3.x


## 连接SQL获取数据
代码样例
```python
# coding=utf-8
import pymysql

SQL = pymysql.connect(
    host='xx.xx.xx.xx',  # 主机名
    port=3306,         # 端口号，MySQL默认为3306
    user='root',       # 用户名
    password='xxx', # 密码
    database='autodev',   # 数据库名称
)

# 实例化
cursor = SQL.cursor()
cursor.execute("SELECT * FROM cdk WHERE Type='admin'")
result = cursor.fetchall()

print(result)

# 退出数据库
cursor.close()
SQL.close()
```

## 连接SQL并插入数据(需要commit保存)
```python
# coding=utf-8
import pymysql

SQL = pymysql.connect(
    host='xx.xx.xx.xx',  # 主机名
    port=3306,         # 端口号，MySQL默认为3306
    user='root',       # 用户名
    password='xxx', # 密码
    database='autodev',   # 数据库名称
)

SQLCommand = """
    INSERT INTO chat
    VALUES (Null, '菲菲', '2023-12-13 20:54:13', '岁的法国');
"""
cursor.execute(SQLCommand)
SQLCommand = """
    SELECT *
    FROM chat;
"""
cursor.execute(SQLCommand)
AdminCDK = cursor.fetchall()

SQL.commit()

# 退出数据库
cursor.close()
SQL.close()
```

