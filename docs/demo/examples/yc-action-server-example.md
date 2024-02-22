# yc-action-server-example

### Feature Overview

`yc-action-server` now is a dependent jar package.

You can download the release jar and load it in your project.
```xml
<dependency>
    <groupId>yzg-gy</groupId>
    <artifactId>yc-action-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/lib/yc-action-server-0.0.1-SNAPSHOT.jar</systemPath>
</dependency>
```
or you can checkout the `yc-action-server` source and use mvn install it.
- if package a dependent jar, remember remove this in the `pom.xml`
```xml
<plugin>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-maven-plugin</artifactId>
</plugin>
```
- and mvn install locally.

### Start Up

1. Maven Dependencies
```xml
<dependency>
    <groupId>yzg-gy</groupId>
    <artifactId>yc-action-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
</dependency>
```
or you can load jar as
```xml
<dependency>
    <groupId>yzg-gy</groupId>
    <artifactId>yc-action-server</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <scope>system</scope>
    <systemPath>${project.basedir}/lib/yc-action-server-0.0.1-SNAPSHOT.jar</systemPath>
</dependency>
```

2.Configure the `yc-action-server` in your `application.yml`

   Here, I use `Apollo` configuration center as an example in `application-apollo.yml`.

3.Then you can do with [yc-action-server/README.md](../../guide/yucong/yc-action-server.md)